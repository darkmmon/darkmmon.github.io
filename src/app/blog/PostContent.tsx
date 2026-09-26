export default function PostContent({ body }: { body: string }) {
  return (
    <div className="prose max-w-none whitespace-pre-wrap leading-relaxed">
      {body.trim()}
    </div>
  );
}
