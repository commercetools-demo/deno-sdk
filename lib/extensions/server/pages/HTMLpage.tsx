/** @jsxImportSource preact */



import { iTriggers } from "../../messagehandlers/base/iTriggers.ts";
import { Header } from "./Header.tsx";
import { Triggers } from "./Triggers.tsx";

export interface pageProps {
   project: string
   triggers: iTriggers[]
} 

export const HTMLpage = (props: pageProps) => {
   return (
      <html>
         <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap" rel="stylesheet"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
            <link href="./public/style.css" rel="stylesheet"/>
         </head>
         <body>
            <Header   project={props.project} />
            <Triggers triggers={props.triggers} />
         </body>
      </html>
   )
}