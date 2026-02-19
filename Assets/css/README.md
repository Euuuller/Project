# CSS Modular Structure

This project uses a modular CSS architecture to organize styles by functionality and responsibility. Below is the breakdown of the structure:

## Directory Structure

```
Assets/
└── css/
    ├── generic/
    │   ├── buttons.css
    │   ├── cards.css
    │   └── forms.css
    ├── base/
    │   ├── reset.css
    │   └── variables.css
    ├── layout/
    │   ├── grid.css
    │   ├── page-layout.css
    │   └── background.css
    ├── components/
    │   ├── navbar.css
    │   ├── section-headings.css
    │   └── modal.css
    ├── sections/
    │   ├── hero.css
    │   ├── sobre.css
    │   ├── skills.css
    │   ├── projetos.css
    │   ├── contato.css
    │   └── footer.css
    ├── utils/
    │   └── responsive.css
    └── main.css (imports all modules)
```

## File Descriptions

### Generic Styles
- **buttons.css**: Reusable button components and styles
- **cards.css**: Reusable card components and styles
- **forms.css**: Reusable form components and styles

### Base Styles
- **reset.css**: Contains CSS reset and base element styles
- **variables.css**: Contains CSS custom properties (variables) for consistent theming

### Layout Styles
- **grid.css**: Grid and flexbox layout utilities
- **page-layout.css**: Page structure and layout components
- **background.css**: Background-related styles and overlays

### Component Styles
- **navbar.css**: Navigation bar and mobile menu styles
- **section-headings.css**: Section heading styles and reveal animations
- **modal.css**: Modal popup styles for project details

### Section Styles
- **hero.css**: Hero section and animated elements
- **sobre.css**: About section layout and statistics cards
- **skills.css**: Skills section and marquee animation
- **projetos.css**: Projects section and card layouts
- **contato.css**: Contact section and form styles
- **footer.css**: Footer layout and social icons

### Utility Styles
- **responsive.css**: Media queries for responsive design

### Main Import File
- **main.css**: Imports all CSS modules in the correct order

## Benefits of This Structure

1. **Maintainability**: Each section/component has its own dedicated file
2. **Scalability**: Easy to add new components without affecting others
3. **Readability**: Clear separation of concerns makes code easier to understand
4. **Reusability**: Generic components can be reused across different sections
5. **Team Collaboration**: Multiple developers can work on different modules simultaneously

## Usage

To use the modular CSS, simply include the main.css file in your HTML:

```html
<link rel="stylesheet" href="Assets/css/main.css" />
```

Or import individual modules if needed:

```css
@import url('base/variables.css');
@import url('components/navbar.css');
```