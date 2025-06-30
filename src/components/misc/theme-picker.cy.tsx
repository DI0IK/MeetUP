import React from 'react';

import { ThemePicker } from '@/components/misc/theme-picker';
import { ThemeProvider } from '@/components/wrappers/theme-provider';

describe('<ThemePicker />', () => {
  it('renders', () => {
    cy.mount(<ThemePicker />);
  });

  it('toggle open and close', () => {
    cy.mount(<ThemePicker />);
    cy.getBySel('theme-picker').click();
    cy.getBySel('theme-picker-content').should('exist');
    cy.get('html').click();
    cy.getBySel('theme-picker-content').should('not.exist');
  });

  it('enable dark mode', () => {
    cy.mount(
      <ThemeProvider>
        <ThemePicker />
      </ThemeProvider>,
    );

    cy.getBySel('theme-picker').click();
    cy.getBySel('dark-theme').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });

  it('enable light mode', () => {
    cy.mount(
      <ThemeProvider>
        <ThemePicker />
      </ThemeProvider>,
    );

    cy.getBySel('theme-picker').click();
    cy.getBySel('light-theme').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });
});
