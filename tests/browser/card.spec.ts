import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/tests/fixture.html");
  await expect(
    page.getByRole("button", { name: "Afspeellijst 0 playlist", exact: true }),
  ).toBeVisible();
});
test("opens a playlist without playing; keeps vertical rows and plays selected context", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Afspeellijst 0 playlist", exact: true })
    .click();
  await expect(page.getByRole("listitem")).toHaveCount(50);
  expect(
    await page.evaluate(() =>
      window["calls"].filter((c) => c.service === "player_media_play_context"),
    ),
  ).toHaveLength(0);
  const rows = await page.getByRole("listitem").all();
  expect((await rows[1].boundingBox())!.y).toBeGreaterThan(
    (await rows[0].boundingBox())!.y,
  );
  await page
    .getByRole("button", { name: "Nummer 3 Artiest", exact: true })
    .click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "player_media_play_context")
          .data.offset_position,
    ),
  ).toBe(3);
  await page.getByRole("button", { name: "Meer laden" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(100);
  await page
    .getByRole("textbox", { name: "Zoeken binnen afspeellijst" })
    .fill("Nummer 83");
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Nummer 83 Artiest", exact: true })
    .click();
  expect(
    await page.evaluate(
      () =>
        window["calls"]
          .filter((c) => c.service === "player_media_play_context")
          .at(-1).data.offset_position,
    ),
  ).toBe(83);
});
test("does not overflow and keeps mini player in view after scrolling", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Afspeellijst 0 playlist", exact: true })
    .click();
  await page.locator("main").evaluate((e) => (e.scrollTop = e.scrollHeight));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const box = await page.locator("footer").boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
  await page.locator("footer .now").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("slider", { name: "Afspeelpositie" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("source switching never sends playback commands and retains active Spotify session", async ({
  page,
}) => {
  await page
    .getByLabel("Muziekbron", { exact: true })
    .selectOption("music_assistant");
  await expect(
    page.getByRole("button", { name: "MA collectie playlist" }),
  ).toBeVisible();
  await expect(page.locator("footer")).toContainText("Externe Spotify-sessie");
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
  await page.getByRole("button", { name: "MA collectie playlist" }).click();
  await page.getByRole("button", { name: "MA nummer", exact: true }).click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "play_media").data.start_item,
    ),
  ).toBe("library://track/1");
});
test("devices exclude Metz, show unavailable status, transfer only by explicit click", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Apparaten", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toContainText("Metz");
  await expect(
    page.getByRole("button", {
      name: "Beperkt apparaat · Spotify Connect · Niet beschikbaar",
    }),
  ).toBeDisabled();
  expect(
    await page.evaluate(() =>
      window["calls"].filter((c) => c.service === "player_transfer_playback"),
    ),
  ).toHaveLength(0);
  await page
    .getByRole("button", { name: "Laptop · Spotify Connect · Beschikbaar" })
    .click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "player_transfer_playback")
          .data.device_id,
    ),
  ).toBe("laptop");
});
test("live hass updates preserve search input and update mini player", async ({
  page,
}) => {
  await page.getByRole("textbox", { name: "Muziek zoeken" }).fill("voorbeeld");
  await page.evaluate(() => {
    const h = window["hass"];
    window["card"].hass = {
      ...h,
      states: {
        ...h.states,
        "media_player.spotify": {
          ...h.states["media_player.spotify"],
          attributes: {
            ...h.states["media_player.spotify"].attributes,
            media_title: "Nieuw extern nummer",
          },
        },
      },
    };
  });
  await expect(page.locator("footer")).toContainText("Nieuw extern nummer");
  await expect(
    page.getByRole("textbox", { name: "Muziek zoeken" }),
  ).toHaveValue("voorbeeld");
});
test("runtime service errors are visible and do not send invented playback", async ({
  page,
}) => {
  await page.evaluate(() => {
    window["hass"].services.spotifyplus = {};
  });
  await page.getByRole("button", { name: "Vernieuwen" }).click();
  await expect(page.getByRole("alert")).toContainText("ontbreekt");
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
test("layout follows card width rather than browser viewport", async ({
  page,
}) => {
  await page.locator("dunk-music-card").evaluate((e) => {
    e.style.width = "320px";
  });
  await expect(page.locator(".left")).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Mobiele navigatie" }),
  ).toBeVisible();
  expect(
    await page
      .locator("dunk-music-card")
      .evaluate(
        (e) =>
          e.shadowRoot.querySelector("main").scrollWidth <=
          e.shadowRoot.querySelector("main").clientWidth,
      ),
  ).toBe(true);
});
test("isolates global Liquid Glass styles", async ({ page }) => {
  const style = await page.locator("dunk-music-card").evaluate((e) => ({
    background: getComputedStyle(e.shadowRoot.querySelector(".app"))
      .backgroundColor,
    font: getComputedStyle(e).fontFamily,
  }));
  expect(style.background).toBe("rgb(18, 18, 18)");
  expect(style.font).toContain("system-ui");
});
test("debounces search and ignores out-of-order responses", async ({
  page,
}) => {
  await page.evaluate(() => {
    const original = window["hass"].callWS;
    window["hass"].callWS = async (m) => {
      if (m.service === "search_all" && m.service_data.criteria === "oud") {
        await new Promise((r) => setTimeout(r, 1000));
        return {
          response: {
            result: {
              tracks: {
                items: [
                  {
                    uri: "spotify:track:old",
                    name: "Verouderd resultaat",
                    type: "track",
                  },
                ],
              },
            },
          },
        };
      }
      return original(m);
    };
  });
  await page.getByRole("textbox", { name: "Muziek zoeken" }).fill("oud");
  await page.waitForTimeout(450);
  await page.getByRole("textbox", { name: "Muziek zoeken" }).fill("nieuw");
  await expect(
    page.getByRole("button", { name: "Nummer 99 Artiest" }),
  ).toBeVisible();
  await page.waitForTimeout(800);
  await expect(page.getByText("Verouderd resultaat")).toHaveCount(0);
});
test("radio chooses MA search and never starts playback from a search shortcut", async ({
  page,
}) => {
  await page.getByLabel("Muziekbron", { exact: true }).selectOption("radio");
  await page.getByRole("button", { name: "NPO Radio 2", exact: true }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () => window["calls"].filter((c) => c.service === "search").length,
      ),
    )
    .toBe(1);
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "search").service_data
          .media_type,
    ),
  ).toEqual(["radio"]);
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
test("one list shows both providers; selecting MA does not transfer or start Spotify", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Apparaten", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Alle apparaten" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /iPhone · Spotify Connect/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Boven · Music Assistant · Niet beschikbaar",
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Beneden · Music Assistant · Geselecteerd" })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Beneden · Music Assistant · Geselecteerd",
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
  await page
    .getByRole("button", { name: "Laptop · Spotify Connect · Beschikbaar" })
    .click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "player_transfer_playback")
          .data.device_id,
    ),
  ).toBe("laptop");
  expect(
    await page.evaluate(() =>
      window["calls"].filter(
        (c) => c.service === "transfer_queue" || c.service === "join",
      ),
    ),
  ).toHaveLength(0);
});
test("device list remains usable when Spotify device discovery fails", async ({
  page,
}) => {
  await page.evaluate(() => {
    const original = window["hass"].callWS;
    window["hass"].callWS = async (m) => {
      if (m.service === "get_player_devices")
        throw new Error("Spotify tijdelijk offline");
      return original(m);
    };
  });
  await page.getByRole("button", { name: "Apparaten", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Spotify tijdelijk offline",
  );
  await expect(
    page.getByRole("button", {
      name: "Beneden · Music Assistant · Geselecteerd",
    }),
  ).toBeEnabled();
});
test("switching to MA finds a playing room beyond the idle default and follows metadata", async ({
  page,
}) => {
  await page.evaluate(() => {
    const h = window["hass"];
    h.states["media_player.offline"] = {
      state: "playing",
      attributes: {
        ...h.states["media_player.room"].attributes,
        friendly_name: "Boven",
        media_title: "Muziek boven",
        media_artist: "Artiest boven",
      },
    };
    window["card"].hass = { ...h };
  });
  await page.getByLabel("Bedien afspeelsessie").selectOption("music_assistant");
  await expect(page.locator("footer")).toContainText("Muziek boven");
  await page.evaluate(() => {
    const h = window["hass"];
    h.states["media_player.offline"].attributes.media_title =
      "Volgend nummer boven";
    window["card"].hass = { ...h };
  });
  await expect(page.locator("footer")).toContainText("Volgend nummer boven");
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
test("explicit idle room selection is not stolen by another active room", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Apparaten", exact: true }).click();
  await page
    .getByRole("button", { name: "Beneden · Music Assistant · Geselecteerd" })
    .click();
  await page.getByRole("button", { name: "Sluiten", exact: true }).click();
  await page.evaluate(() => {
    const h = window["hass"];
    h.states["media_player.offline"] = {
      state: "playing",
      attributes: { media_title: "Andere kamer", friendly_name: "Boven" },
    };
    window["card"].hass = { ...h };
  });
  await expect(page.getByLabel("Doelkamer")).toHaveValue("media_player.room");
  await expect(page.locator("footer")).toContainText("Externe Spotify-sessie");
  await expect(page.locator("footer")).not.toContainText("Andere kamer");
});
test("choosing Music Assistant while only iPhone plays keeps iPhone now playing visible", async ({
  page,
}) => {
  await page.getByLabel("Bedien afspeelsessie").selectOption("music_assistant");
  await expect(page.getByLabel("Bedien afspeelsessie")).toHaveValue("spotify");
  await expect(page.locator("footer")).toContainText("Externe Spotify-sessie");
  await expect(page.locator("footer")).toContainText("iPhone");
  await page
    .getByLabel("Muziekbron", { exact: true })
    .selectOption("music_assistant");
  await expect(page.locator("footer")).toContainText("iPhone");
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
