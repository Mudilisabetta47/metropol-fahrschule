/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Bestätige deine E-Mail für Fahrschule Metropol</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={logoUrl} alt="Fahrschule Metropol" width="160" height="auto" style={logo} />
        <Heading style={h1}>Willkommen bei Metropol! 🚗</Heading>
        <Text style={text}>
          Schön, dass du dabei bist! Bestätige bitte deine E-Mail-Adresse (
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>
          ), damit wir loslegen können.
        </Text>
        <Button style={button} href={confirmationUrl}>
          E-Mail bestätigen
        </Button>
        <Text style={footer}>
          Falls du kein Konto erstellt hast, kannst du diese E-Mail einfach ignorieren.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const logoUrl = 'https://zsothhtfripxdiphedsu.supabase.co/storage/v1/object/public/site-images/logo.avif'
const main = { backgroundColor: '#ffffff', fontFamily: "'Plus Jakarta Sans', 'Space Grotesk', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const logo = { marginBottom: '24px' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  fontFamily: "'Space Grotesk', Arial, sans-serif",
  color: '#141a21',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#5e6470',
  lineHeight: '1.6',
  margin: '0 0 25px',
}
const link = { color: '#00cc28', textDecoration: 'underline' }
const button = {
  backgroundColor: '#00cc28',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '14px',
  padding: '14px 24px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
