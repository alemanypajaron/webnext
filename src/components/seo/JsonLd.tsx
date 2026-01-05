type JsonLdProps = {
  data: unknown;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here; data is a plain object we create server-side.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


