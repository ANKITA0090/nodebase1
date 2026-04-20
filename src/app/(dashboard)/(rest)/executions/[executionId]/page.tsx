interface ExecutionPageProps {
  params: Promise<{ executionId: string }>
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {
  const { executionId } = await params
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Execution {executionId}</h1>
    </div>
  )
}
