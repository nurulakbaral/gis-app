# Introduction

### GIS Rendering Application

The GIS app displays only four provinces and two specific locations (Monas and IKN). You can view the deployed GIS app [here](https://gis-app-bice.vercel.app).

# Quickstart

- Clone this repository.
- Run `pnpm install`
- Run `pnpm dev`

# Description of Features

The GIS app offers a range of features, including:

- Layer Control: Users can toggle the visibility of Provinces and Locations layers independently, allowing for a customizable viewing experience.

- Interactive Zoom: The app provides zoom in/out functionality, enabling users to explore more granular details of each province and specific locations like Monas and IKN.

- Edit and Remove Features: Users can easily edit the attributes of existing Provinces and Locations or remove them entirely from the map.

These features enhance the app's usability by giving users greater control over the map's display and data management.

# Specification

- Next.js 14
- Mantine UI
- Leaflet
- React-leaflet
- Zustand

# Miscellaneous

### Why not choose Shadcn UI?

If we look at the documentation, we need to install several libraries like `class-variance-authority`, `clsx`, and `tailwind-merge`. While these libraries are quite small, if not used wisely, they can impact performance due to runtime overhead. That's why we prefer using Mantine UI, which relies almost entirely on standard CSS, minimizing such concerns.
