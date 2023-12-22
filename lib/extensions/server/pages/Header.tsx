/** @jsxImportSource preact */

export interface pageProps {
   project: string
}

export const Header = (props: pageProps) => {
   return (
      <header class="masthead d-flex align-items-center">
         <div class="container px-4 px-lg-5 text-center">
            <h1 class="mb-1"><img src="https://avatars.githubusercontent.com/u/1084585?s=280&v=4" className={"ctlogo"} />Listener</h1>
            <h3 class="mb-5">Listening to project: <em class="text-primary">{props.project}</em></h3>
         </div>
      </header>
   )
}