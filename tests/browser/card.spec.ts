import { test, expect, type Page } from "@playwright/test";
async function navigate(page: Page, name: string) {
  if (
    await page.getByRole("button", { name: "Meer", exact: true }).isVisible()
  ) {
    await page.getByRole("button", { name: "Meer", exact: true }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name, exact: true })
      .click();
  } else {
    await page
      .getByRole("button", { name, exact: true })
      .filter({ visible: true })
      .click();
  }
}
async function source(page: Page, value: string) {
  await navigate(page, "Instellingen");
  await page.getByLabel("Bibliotheekbron", { exact: true }).selectOption(value);
}
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
  expect(
    await page.evaluate(
      () =>
        window["calls"]
          .filter((c) => c.service === "player_media_play_context")
          .at(-1).data.offset_uri,
    ),
  ).toBe("spotify:track:t83");
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
  await source(page, "music_assistant");
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
test("radio shows built-in logos and plays verified stream on explicit station click", async ({
  page,
}) => {
  await navigate(page, "Radio");
  const radio = page.getByRole("button", {
    name: "Speel NPO Radio 2",
    exact: true,
  });
  await expect(radio).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".radio-tiles img")
        .evaluateAll(
          (imgs) => imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
        ),
    )
    .toBe(6);
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
  await radio.click();
  expect(
    await page.evaluate(() =>
      window["calls"].find((c) => c.service === "play_media"),
    ),
  ).toMatchObject({
    domain: "music_assistant",
    data: {
      media_id: "https://icecast.omroep.nl/radio2-bb-mp3",
      media_type: "radio",
    },
    target: { entity_id: "media_player.room" },
  });
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
  await page
    .getByRole("button", { name: "Actief apparaat kiezen", exact: true })
    .click();
  await page
    .getByRole("button", { name: /Boven · Music Assistant · Speelt/ })
    .click();
  await page.getByRole("button", { name: "Sluiten", exact: true }).click();
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
  expect(await page.evaluate(() => window["card"].player)).toBe(
    "media_player.room",
  );
  await expect(page.locator("footer")).toContainText("Externe Spotify-sessie");
  await expect(page.locator("footer")).not.toContainText("Andere kamer");
});
test("choosing Music Assistant while only iPhone plays keeps iPhone now playing visible", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Actief apparaat kiezen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Beneden · Music Assistant · Geselecteerd" })
    .click();
  await page.getByRole("button", { name: "Sluiten", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Actief apparaat kiezen", exact: true }),
  ).toContainText("iPhone");
  await expect(page.locator("footer")).toContainText("Externe Spotify-sessie");
  await expect(page.locator("footer")).toContainText("iPhone");
  await source(page, "music_assistant");
  await expect(page.locator("footer")).toContainText("iPhone");
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
test("local Cast appears alongside iPhone and selects the SpotifyPlus directory ID", async ({
  page,
}) => {
  await page.evaluate(() => {
    const h = window["hass"];
    h.services.spotifyplus.get_spotify_connect_devices = {};
    const original = h.callWS;
    h.callWS = async (m) =>
      m.service === "get_spotify_connect_devices"
        ? {
            response: {
              result: {
                Items: [
                  {
                    Id: "cast-local",
                    Name: "Nest Mini",
                    IsChromeCast: true,
                    IsInDeviceList: false,
                    DiscoveryResult: { IsDynamicDevice: false },
                  },
                ],
              },
            },
          }
        : original(m);
  });
  await page.getByRole("button", { name: "Apparaten", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /iPhone · Spotify Connect/ }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Nest Mini · Spotify Connect · Google Cast · Beschikbaar",
    })
    .click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "player_transfer_playback")
          .data.device_id,
    ),
  ).toBe("cast-local");
});
test("radio works without saved favorites or search services and logos need no external requests", async ({
  page,
}) => {
  await page.evaluate(() => {
    delete window["hass"].services.music_assistant.get_library;
    delete window["hass"].services.music_assistant.search;
  });
  await page.route("https://**/*", (route) => route.abort());
  await navigate(page, "Radio");
  await expect(
    page.getByRole("button", { name: "Speel Qmusic", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".radio-tiles img")
        .evaluateAll(
          (imgs) => imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
        ),
    )
    .toBe(6);
  await page.getByRole("button", { name: "Speel Qmusic", exact: true }).click();
  expect(
    await page.evaluate(
      () =>
        window["calls"].find((c) => c.service === "play_media").data.media_id,
    ),
  ).toBe("https://stream.qmusic.nl/qmusic/mp3");
});
test("radio sends no shuffle field to older MA and does not retry playback", async ({
  page,
}) => {
  await navigate(page, "Radio");
  await page.getByRole("button", { name: "Speel Qmusic", exact: true }).click();
  const calls = await page.evaluate(() =>
    window["calls"].filter((c) => c.service === "play_media"),
  );
  expect(calls).toHaveLength(1);
  expect(calls[0].data).not.toHaveProperty("shuffle");
  await expect(page.getByRole("alert")).toHaveCount(0);
});
test("plain HA websocket failure shows its message instead of object Object", async ({
  page,
}) => {
  await page.evaluate(() => {
    window["hass"].callService = async () => {
      throw {
        code: "home_assistant_error",
        message: "De gekozen luidspreker is onbereikbaar",
      };
    };
  });
  await navigate(page, "Radio");
  await page.getByRole("button", { name: "Speel Qmusic", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    "De gekozen luidspreker is onbereikbaar",
  );
  await expect(page.getByRole("alert")).not.toContainText("[object Object]");
});
test("Spotify playback is compatible with older schemas and shows structured errors", async ({
  page,
}) => {
  await page.evaluate(() => {
    const original = window["hass"].callService;
    window["hass"].callService = async (d, s, data, target) => {
      if (d === "spotifyplus" && "shuffle" in data)
        throw { message: "not a valid option at 'shuffle'" };
      return original(d, s, data, target);
    };
  });
  await page
    .getByRole("button", { name: "Afspeellijst 0 playlist", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Nummer 3 Artiest", exact: true })
    .click();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.evaluate(() => {
    window["hass"].callService = async () => {
      throw { error: { message: "Geen actief Spotify-apparaat" } };
    };
  });
  await page
    .getByRole("button", { name: "Nummer 4 Artiest", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "Geen actief Spotify-apparaat",
  );
  await expect(page.getByRole("alert")).not.toContainText("[object Object]");
});

for (const shuffled of [false, true]) {
  test(`first playlist row starts the chosen track with existing shuffle=${shuffled}`, async ({
    page,
  }) => {
    await page.evaluate((shuffle) => {
      const h = window["hass"];
      h.states["media_player.spotify"].attributes.shuffle = shuffle;
      const original = h.callService;
      h.callService = async (d, s, data, target) => {
        await original(d, s, data, target);
        if (s === "shuffle_set")
          h.states[data.entity_id].attributes.shuffle = data.shuffle;
        if (s === "player_media_play_context") {
          // SpotifyPlus gives URI priority; it drops position=0 and randomizes positions with shuffle.
          const activeShuffle =
            h.states["media_player.spotify"].attributes.shuffle;
          const offset = activeShuffle ? 17 : data.offset_position;
          const uri =
            data.offset_uri ??
            (offset > 0
              ? `spotify:track:t${offset}`
              : "spotify:track:previous");
          window["startedTrack"] = uri;
          h.states["media_player.spotify"].attributes.media_title = uri;
          window["card"].hass = { ...h };
        }
      };
    }, shuffled);
    await page
      .getByRole("button", { name: "Afspeellijst 0 playlist", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Nummer 0 Artiest", exact: true })
      .click();
    await expect
      .poll(() => page.evaluate(() => window["startedTrack"]))
      .toBe("spotify:track:t0");
    await expect(page.locator("footer")).toContainText("spotify:track:t0");
    const calls = await page.evaluate(() =>
      window["calls"].filter((c) => !c.type),
    );
    expect(
      calls.filter((c) => c.service === "player_media_play_context"),
    ).toHaveLength(1);
    expect(calls.at(-1).data).toMatchObject({
      context_uri: "spotify:playlist:p0",
      offset_uri: "spotify:track:t0",
      offset_position: 0,
    });
    if (shuffled)
      expect(calls[0]).toMatchObject({
        service: "shuffle_set",
        data: { shuffle: false },
      });
    await expect(page.getByRole("alert")).toHaveCount(0);
  });
}
test("header has one device button; library source persists across Radio and reload", async ({
  page,
}) => {
  await expect(page.locator("header select")).toHaveCount(0);
  await expect(page.locator("header button")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Actief apparaat kiezen" }),
  ).toContainText("iPhone");
  await source(page, "music_assistant");
  await navigate(page, "Radio");
  await expect(
    page.getByRole("button", { name: "Speel Qmusic", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Speel Qmusic", exact: true }),
  ).toBeVisible();
  await navigate(page, "Home");
  await expect(
    page.getByRole("button", { name: "MA collectie playlist" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => window["calls"].filter((c) => !c.type)),
  ).toHaveLength(0);
});
