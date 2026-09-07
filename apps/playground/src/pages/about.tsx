const About = () => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="max-w-md text-center text-muted-foreground">
        This is the About page. The navbar stays visible here and across every
        route in the playground.
      </p>
    </div>
  )
}

export default About