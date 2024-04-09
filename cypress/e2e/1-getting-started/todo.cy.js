describe('SearchComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('performs search', () => {
    // 输入搜索词
    cy.get('input[placeholder="Search..."]').type('yhf');
    cy.get('input[placeholder="Search..."]').type('{enter}');

    cy.wait(3000)
    // 检查搜索结果
    cy.contains('yhf').should('be.visible');
  });

  it('clears search', () => {
    // 输入搜索词
    cy.get('input[placeholder="Search..."]').type('oneoneoneoneoneone');
    cy.wait(1000)
    // 点击清除按钮
    cy.get('svg').click();
    cy.get('input[placeholder="Search..."]').type('two');
    cy.wait(3000)
    // 点击清除按钮
    cy.get('svg').click();
    // 检查搜索框是否已清空
    cy.get('input[placeholder="Search..."]').should('have.value', '');
  });

});