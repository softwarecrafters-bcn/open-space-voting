import Link from "next/link";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="relative w-full h-64">
          <Image
            src="/confused-travolta.gif"
            alt="John Travolta confundido"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold">¡Ups! 🤔</h1>
        
        <p className="text-xl text-muted-foreground">
          Parece que te has perdido en el ciberespacio...
        </p>
        
        <div className="animate-bounce">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white dark:text-primary-foreground bg-primary dark:bg-primary rounded-lg hover:bg-primary/90 dark:hover:bg-primary/90 transition-colors"
          >
            🏠 Volver a casa antes que mamá se preocupe
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground mt-8">
          Error 404: Página no encontrada (pero al menos encontramos este meme 😅)
        </p>
      </div>
    </div>
  );
}
