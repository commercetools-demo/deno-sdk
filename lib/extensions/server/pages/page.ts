import { render } from "preact-render-to-string";

import { HTMLpage } from "./HTMLpage.tsx";
import { iTriggers } from "../../messagehandlers/base/iTriggers.ts";


export class Page {
   public static render(project: string, triggers: iTriggers[]): string {
      return render(HTMLpage({project: project, triggers: triggers}))
   }
}