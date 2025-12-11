# Landing Page Agent Resources

> Resources for AI agents building landing pages with extractable components.

## Purpose

When building a new landing page in a fresh project, follow these patterns so components can be **directly extracted** into the CreativeShire builder system.

## Contents

| File | Description |
|------|-------------|
| [BRIEF.md](./BRIEF.md) | Architecture overview and rules |
| [SCHEMA-FIELDS.md](./SCHEMA-FIELDS.md) | All available schema field types |
| [templates/](./templates/) | Copy-paste templates for each component type |
| [examples/](./examples/) | Real-world examples (project card, grid, etc.) |

## Quick Start

1. Read `BRIEF.md` for the architecture
2. Copy template from `templates/` matching your component type
3. Fill in schema fields using `SCHEMA-FIELDS.md` as reference
4. Check `examples/` for inspiration

## Component Types

| Type | Purpose | Example |
|------|---------|---------|
| `block` | Atomic visual element | heading, button, project-card |
| `layout` | Arranges children | stack, grid, projects-grid |
| `section` | Page section wrapper | hero, projects-section, footer |
| `page` | Root container | landing-page |

---

**Source Project:** CreativeShire Navigation
**Created:** 2025-12-03
