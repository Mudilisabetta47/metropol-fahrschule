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
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Passwort zurücksetzen – Fahrschule Metropol</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={logoUrl} alt="Fahrschule Metropol" width="160" height="auto" style={logo} />
        <Heading style={h1}>Passwort zurücksetzen</Heading>
        <Text style={text}>
          Du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den Button unten, um ein neues Passwort zu wählen.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Neues Passwort wählen
        </Button>
        <Text style={footer}>
          Falls du das nicht angefordert hast, kannst du diese E-Mail ignorieren. Dein Passwort bleibt unverändert.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

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
