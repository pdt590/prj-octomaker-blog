import Vue from 'vue'
import * as tocbot from "tocbot";
import { formatString } from "~/libs/helpers";

Vue.prototype.$initToC = () => {
  tocbot.init({
    // Where to render the table of contents.
    tocSelector: ".toc",
    // Where to grab the headings to build the table of contents.
    contentSelector: ".toc-content",
    // Which headings to grab inside of the contentSelector element.
    headingSelector: "h1, h2",
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,
    // How many heading levels should not be collapsed.
    collapseDepth: 2,
    // Optional callback to change heading labels. 
    headingLabelCallback: (string) => {
      return formatString(string, 50);
    }
  });
}