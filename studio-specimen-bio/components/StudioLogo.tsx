import logoUrl from '../static/logo.png'

export function StudioLogo() {
  return (
    <img
      src={logoUrl}
      alt="Specimen Bio"
      style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '20%'}}
    />
  )
}
