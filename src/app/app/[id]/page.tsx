export default function Page({ params }: { params: { id: string } }) {
  return <div>Conversation id: {params.id}</div>
}
