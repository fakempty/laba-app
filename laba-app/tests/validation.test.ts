import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation Namespace', () => {
  describe('isNotEmpty', () => {
    it('має повертати true для непорожніх рядків', () => {
      expect(Validation.isNotEmpty('Привіт')).to.be.true;
    });

    it('має повертати false для порожніх або пробільних рядків', () => {
      expect(Validation.isNotEmpty('')).to.be.false;
      expect(Validation.isNotEmpty('   ')).to.be.false;
    });
  });

  describe('isNumericId', () => {
    it('має валідувати ID, які складаються лише з цифр', () => {
      expect(Validation.isNumericId('1725533394038')).to.be.true;
    });

    it('має відхиляти ID з літерами чи спецсимволами', () => {
      expect(Validation.isNumericId('17255abc')).to.be.false;
      expect(Validation.isNumericId('12-34')).to.be.false;
    });
  });

  describe('isValidYear', () => {
    it('має приймати валідний 4-значний рік', () => {
      expect(Validation.isValidYear('2004')).to.be.true;
      expect(Validation.isValidYear(1999)).to.be.true;
    });

    it('має відхиляти невалідний рік або рік з майбутнього', () => {
      expect(Validation.isValidYear('99')).to.be.false;
      expect(Validation.isValidYear('year')).to.be.false;
      expect(Validation.isValidYear('3500')).to.be.false;
    });
  });
});