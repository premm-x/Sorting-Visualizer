function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Sorting Visualizer
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="#" 
              className="text-neutral-400 hover:text-primary transition-colors"
              aria-label="Github Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <span className="text-sm text-neutral-500">
              Learn about sorting algorithms interactively
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer