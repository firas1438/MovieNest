'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-5 uppercase font-semibold rounded-xl">
      <ArrowLeft className="mr-2 h-4 w-4" /> Return
    </Button>
  )
}

