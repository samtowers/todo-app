import React from "react";
import TaskList from "../TaskList";

const ITEMS = {0: {name: 'Go to shops', done: false}, 1: {name: 'Empty bins', done: true}};

describe('TaskList object', () => {
    it('accepts items', () => {
        const tl = new TaskList(ITEMS);
        expect(tl.items).toBe(ITEMS)
    });
    it('filters items', () => {
        const tl = new TaskList(ITEMS);
        expect(Array.from(tl.filterItems(true))).toEqual([
            [1, ITEMS[1]],
        ]);
        expect(Array.from(tl.filterItems(false))).toEqual([
            [0, ITEMS[0]],
        ]);
    });
    it('adds item', () => {
        const tl = new TaskList(ITEMS);
        const newTl = tl.add('Clean house', false);
        expect(Object.entries(newTl.items)).toHaveLength(3);
        expect(newTl.items).toHaveProperty('2');
        expect(newTl.items[2]).toHaveProperty('name', 'Clean house');
    });
    it('removes item', () => {
        const tl = new TaskList(ITEMS);
        const newTl = tl.remove(0);
        expect(Object.entries(newTl.items)).toHaveLength(1);
        expect(newTl.items).toHaveProperty('1');
    });
})