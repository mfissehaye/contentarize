import { expectTypeOf, test } from "vitest";
import type { Field, PickIdValuesFromType } from "..";

// Construct sample fields including different types
type SampleFields = [
  { id: "title"; type: "text"; label: string },
  { id: "firstButtonLink"; type: "url"; label: string },
  { id: "count"; type: "number"; label: string },
  { id: "isActive"; type: "boolean"; label: string }
] extends Field[]
  ? [
      { id: "title"; type: "text"; label: string },
      { id: "firstButtonLink"; type: "url"; label: string },
      { id: "count"; type: "number"; label: string },
      { id: "isActive"; type: "boolean"; label: string }
    ]
  : never;

type Values = PickIdValuesFromType<SampleFields>;

test("field types map correctly to their value types", () => {
  // Text fields are string
  expectTypeOf<Values>().toHaveProperty("title");
  expectTypeOf<Values["title"]>().toEqualTypeOf<string>();

  // Url fields are string (not string | boolean)
  expectTypeOf<Values>().toHaveProperty("firstButtonLink");
  expectTypeOf<Values["firstButtonLink"]>().toEqualTypeOf<string>();

  // Number fields are number (not number | boolean)
  expectTypeOf<Values>().toHaveProperty("count");
  expectTypeOf<Values["count"]>().toEqualTypeOf<number>();

  // Boolean fields are boolean only
  expectTypeOf<Values>().toHaveProperty("isActive");
  expectTypeOf<Values["isActive"]>().toEqualTypeOf<boolean>();
});

test("url fields expose _target boolean", () => {
  // And `${id}_target` exists as optional boolean
  expectTypeOf<Values>().toHaveProperty("firstButtonLink_target");
  expectTypeOf<Values["firstButtonLink_target"]>().toMatchTypeOf<boolean | undefined>();

  // Non-url field should NOT have _target key
  // @ts-expect-error - title_target should not exist
  type _NoTitleTarget = Values["title_target"];
});


