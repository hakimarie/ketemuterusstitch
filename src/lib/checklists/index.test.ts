import test from "node:test";
import assert from "node:assert/strict";
import { cafeChecklist } from "./cafe";
import { genericChecklist } from "./generic";
import { getChecklistForCategory } from "./index";

test("cafe category aliases resolve to the cafe checklist", () => {
  for (const category of ["Cafe / Kedai Kopi", "Cafe", "Coffee Shop", "Kedai Kopi"]) {
    assert.equal(getChecklistForCategory(category), cafeChecklist, category);
  }
});

test("unknown and empty categories resolve to the generic checklist", () => {
  for (const category of ["Bengkel Motor", "Salon Kecantikan", "", "Kategori lain"]) {
    assert.equal(getChecklistForCategory(category), genericChecklist, category);
  }
});

test("both starter templates contain eight complete, deterministic items", () => {
  for (const template of [cafeChecklist, genericChecklist]) {
    assert.equal(template.items.length, 8);
    assert.equal(new Set(template.items.map((item) => item.id)).size, 8);

    for (const item of template.items) {
      assert.ok(item.id);
      assert.ok(item.title);
      assert.ok(item.why);
      assert.ok(item.whatToCheck);
      assert.ok(item.howToFix);
      assert.ok(item.estimatedTime);
      assert.ok(["high", "medium", "low"].includes(item.priority));
      assert.deepEqual(item.appliesTo, ["all"]);
    }
  }
});
