import './globals.css'
import Nav from './auth/Nav'

export default function RootLayout({children}){
  return (
    <html lang="en">
      <head />
      <body className={`mx-4 md:mx-48 xl:mx-96 bg-gray-200`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
