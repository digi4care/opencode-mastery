# Introduction

**Source**: https://www.shadcn-svelte.com/docs

## Table of Contents

- [Open Code](#open-code)
- [Composition](#composition)
- [Distribution](#distribution)
- [Beautiful Defaults](#beautiful-defaults)
- [AI-Ready](#ai-ready)

## Content

Re-usable components built with Bits UI and Tailwind CSS.

An unofficial, community-led Svelte port of shadcn/ui. We are not affiliated with shadcn, but we did get his blessing before creating a Svelte version of his work. This project was born out of the need for a similar project for the Svelte ecosystem.

This is not a component library. It is how you build your component library.

You know how most traditional component libraries work: you install a package from NPM, import the components, and use them in your app.

This approach works well until you need to customize a component to fit your design system or require one that isn’t included in the library. Often, you end up wrapping library components, writing workarounds to override styles, or mixing components from different libraries with incompatible APIs.

This is what shadcn-svelte aims to solve. It is built around the following principles:

shadcn-svelte hands you the actual component code. You have full control to customize and extend the components to your needs. This means:

In a typical library, if you need to change a button’s behavior, you have to override styles or wrap the component. With shadcn-svelte, you simply edit the button code directly.

shadcn-svelte follows a headless component architecture. This means the core of your app can receive fixes by updating your dependencies, for instance, bits-ui or paneforge.

The topmost layer, i.e., the one closest to your design system, is not coupled with the implementation of the library. It stays open for modification.

Every component in shadcn-svelte shares a common, composable interface. If a component does not exist, we bring it in, make it composable, and adjust its style to match and work with the rest of the design system.

A shared, composable interface means it's predictable for both your team and LLMs. You are not learning different APIs for every new component. Even for third-party ones.

shadcn-svelte is also a code distribution system. It defines a schema for components and a CLI to distribute them.

You can use the schema to distribute your components to other projects or have AI generate completely new components based on existing schema.

shadcn-svelte comes with a large collection of components that have carefully chosen default styles. They are designed to look good on their own and to work well together as a consistent system:

The design of shadcn-svelte makes it easy for AI tools to work with your code. Its open code and consistent API allow AI models to read, understand, and even generate new components.

An AI model can learn how your components work and suggest improvements or even create new components that integrate with your existing design.

## Sections

## Open Code

## Composition

## Distribution

## Beautiful Defaults

## AI-Ready
