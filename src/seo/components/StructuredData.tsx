/**
 * StructuredData — renders one or more JSON-LD <script> tags into the <head>.
 * Accepts any number of schema objects; each is serialized to its own script tag.
 */
export function StructuredData({ schemas }: { schemas: Record<string, unknown>[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
}
