import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

// array of goals with label (alt text), color in hex for color-only and image source
const goals = [
  {
    label: "No Poverty",
    color: "#d83534",
    image: new URL("/lib/svgs/1.svg", import.meta.url).href,
  },

  {
    label: "Zero Hunger",
    color: "#cba342",
    image: new URL("/lib/svgs/2.svg", import.meta.url).href,
  },

  {
    label: "Good Health and Well-being",
    color: "#cba342",
    image: new URL("/lib/svgs/3.svg", import.meta.url).href,
  },

  {
    label: "Quality Education",
    color: "#b32e36",
    image: new URL("/lib/svgs/4.svg", import.meta.url).href,
  },

  {
    label: "Gender Equality",
    color: "#dd4d35",
    image: new URL("/lib/svgs/5.svg", import.meta.url).href,
  },

  {
    label: "Clean Water And Sanitation",
    color: "#4eacd5",
    image: new URL("/lib/svgs/6.svg", import.meta.url).href,
  },

  {
    label: "Affordable And Clean Energy",
    color: "#f3bb42",
    image: new URL("/lib/svgs/7.svg", import.meta.url).href,
  },

  {
    label: "Decent Work And Economic Growth",
    color: "#842036",
    image: new URL("/lib/svgs/8.svg", import.meta.url).href,
  },

  {
    label: "Industry, Innovation And Infrastructure",
    color: "#e37537",
    image: new URL("/lib/svgs/9.svg", import.meta.url).href,
  },

  {
    label: "Reduced Inequalities",
    color: "#ce2f82",
    image: new URL("/lib/svgs/10.svg", import.meta.url).href,
  },

  {
    label: "Sustainable Cities And Communities",
    color: "#eca342",
    image: new URL("/lib/svgs/11.svg", import.meta.url).href,
  },

  {
    label: "Responsible Consumption And Production",
    color: "#c7913e",
    image: new URL("/lib/svgs/12.svg", import.meta.url).href,
  },

  {
    label: "Climate Action",
    color: "#527742",
    image: new URL("/lib/svgs/13.svg", import.meta.url).href,
  },

  {
    label: "Life Below Water",
    color: "#367cb7",
    image: new URL("/lib/svgs/14.svg", import.meta.url).href,
  },

  {
    label: "Life On Land",
    color: "#5fae55",
    image: new URL("/lib/svgs/15.svg", import.meta.url).href,
  },

  {
    label: "Peace, Justice And Strong Institutions",
    color: "#225387",
    image: new URL("/lib/svgs/16.svg", import.meta.url).href,
  },

  {
    label: "Partnerships For The Goals",
    color: "#1b3264",
    image: new URL("/lib/svgs/17.svg", import.meta.url).href,
  },
];

export class UnSdg extends DDDSuper(LitElement) {
  // default to goal 1
  constructor() {
    super();
    this.goal = 1;
    this.label = "No Poverty";
    this.image = new URL("/lib/svgs/1.svg", import.meta.url).href;
    this.width = 254;
    this.colorOnly = false;
  }

  // reflect goal, width, and colorOnly properties to attributes so they can be updated
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      image: { type: String },
      width: { type: Number, reflect: true },
      colorOnly: { type: Boolean, attribute: "color-only", reflect: true },
    };
  }

  // when goal property is updated, update the image source
  updated(changedProperties) {
    if (changedProperties.has("goal")) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    // checking if goal is "all" or "circle" then setting the image source
    if (this.goal === "all" || this.goal === "circle") {
      this._currentSrc = new URL(
        `/lib/svgs/${this.goal}.svg`,
        import.meta.url
      ).href;
      // setting alt text if the goal is "all" or "circle"
      this.label =
        this.goal === "all"
          ? "All Sustainable Development Goals"
          : "Sustainable Development Goals Circle";
    } else {
      // checking if goal is between 1 and 17 then setting the image source
      const goal = parseInt(this.goal);
      if (goal >= 1 && goal <= 17) {
        // filenames are "1.svg", "2.svg"... to make it easy to set the image source based on the goal number
        this.image = new URL(`/lib/svgs/${goal}.svg`, import.meta.url).href;
        // setting alt text based on the goal number
        this.label = `Goal ${goal}: ${goals[goal - 1].label}`;
      }
    }
  }

  static get styles() {
    return css`
      :host {
        // css variables with hex values of each svg
        --un-sdg-goal-1: #d83534;
        --un-sdg-goal-2: #cba342;
        --un-sdg-goal-3: #cba342;
        --un-sdg-goal-4: #b32e36;
        --un-sdg-goal-5: #dd4d35;
        --un-sdg-goal-6: #4eacd5;
        --un-sdg-goal-7: #f3bb42;
        --un-sdg-goal-8: #842036;
        --un-sdg-goal-9: #e37537;
        --un-sdg-goal-10: #ce2f82;
        --un-sdg-goal-11: #eca342;
        --un-sdg-goal-12: #c7913e;
        --un-sdg-goal-13: #527742;
        --un-sdg-goal-14: #367cb7;
        --un-sdg-goal-15: #5fae55;
        --un-sdg-goal-16: #225387;
        --un-sdg-goal-17: #1b3264;

        display: inline-block;
      }
    `;
  }

  render() {
    // rendering image if goal is "all" or "circle" with src and alt properties, setting width based on the width property, default 254px
    if (this.goal === "all" || this.goal === "circle") {
      this.image = new URL(`/lib/svgs/${this.goal}.svg`, import.meta.url).href;
      return html` <img
        src="${this.image}"
        alt="${this.label}"
        style="width: ${this.width}px;"
      />`;
    }

    // rendering color box if color-only attribute is set to true
    if (this.colorOnly) {
      // parseInt to convert string to number to get an index of the goal
      const goal = parseInt(this.goal);
      // checking if goal is between 1 and 17 then setting the color box with background color based on the goal number
      if (goal >= 1 && goal <= 17) {
        const color = goals[goal - 1].color;
        const width = this.width;
        // setting background color based on goal number, width and height are the same so it is a square based on the width property
        return html`<div
          style="background-color: ${color};width: ${width}px;height: ${width}px;"
        ></div>`;
      }
    }

    // if goal is not "all" or "circle" and color-only attribute is not set to true then rendering the image with src and alt properties, setting width based on the width property, default 254px
    return html` <img
      src="${this.image}"
      alt="${this.label}"
      style="width: ${this.width}px;"
    />`;
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define("un-sdg", UnSdg);
