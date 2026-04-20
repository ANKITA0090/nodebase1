interface CredentialPageProps {
  params: Promise<{ credentialId: string }>
}

export default async function CredentialPage({ params }: CredentialPageProps) {
  const { credentialId } = await params
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Credential {credentialId}</h1>
    </div>
  )
}
