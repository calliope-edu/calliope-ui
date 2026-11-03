import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import LineChart, { type LineChartSeries } from './LineChart.svelte';
import { assignSeriesSlots, shapeOf, timeTicks, typicalInterval, valueTicks } from './chart.js';

const start = Date.UTC(2026, 10, 2, 13, 0);
const minute = 60_000;
const at = (i: number, v: number) => ({ t: start + i * 5 * minute, v });

const series: LineChartSeries[] = [
	{ id: 'A1', name: 'Calliope 1', points: [at(0, 20), at(1, 21.5), at(2, 22)] },
	{ id: 'B2', name: 'Wetterstation', slot: 3, points: [at(0, 17), at(2, 18)] }
];

// Fixed formats keep the tests independent of the machine's time zone.
const props = {
	label: 'Temperatur',
	series,
	unit: '°C',
	formatTime: (t: number) => `${(t - start) / minute} min`
};

const chart = () => screen.getByRole('application', { name: 'Temperatur' });
const status = () => screen.getAllByRole('status').at(-1)!;

describe('LineChart', () => {
	it('is a named application described by the summary and the keyboard hint', () => {
		render(LineChart, props);
		const app = chart();
		expect(app).toHaveAttribute('tabindex', '0');
		expect(app).toHaveAttribute('aria-roledescription', 'Diagramm');
		expect(app).toHaveAccessibleDescription(
			'Liniendiagramm mit 2 Reihen, 0 min bis 10 min. Calliope 1: 20 °C bis 22 °C, zuletzt 22 °C. ' +
				'Wetterstation: 17 °C bis 18 °C, zuletzt 18 °C. Pfeiltasten links und rechts gehen die Werte ' +
				'durch, oben und unten wechseln die Reihe, Pos1 und Ende springen an die Enden.'
		);
	});

	it('takes a summary of its own', () => {
		render(LineChart, { ...props, summary: 'Steigt seit Mittag.' });
		expect(chart()).toHaveAccessibleDescription(expect.stringMatching(/^Steigt seit Mittag\./));
	});

	it('names every series in the legend', () => {
		render(LineChart, props);
		const legend = screen.getByRole('list');
		expect(
			within(legend)
				.getAllByRole('listitem')
				.map((li) => li.textContent?.trim())
		).toEqual(['Calliope 1', 'Wetterstation']);
	});

	it('has a hidden table with the same values, one row per time', () => {
		render(LineChart, props);
		const table = screen.getByRole('table', { name: 'Temperatur: alle Werte' });
		const headers = within(table)
			.getAllByRole('columnheader')
			.map((th) => th.textContent);
		expect(headers).toEqual(['Zeit', 'Calliope 1', 'Wetterstation']);
		const rows = within(table).getAllByRole('row').slice(1);
		expect(rows.map((r) => [...r.children].map((c) => c.textContent))).toEqual([
			['0 min', '20 °C', '17 °C'],
			['5 min', '21,5 °C', ''],
			['10 min', '22 °C', '18 °C']
		]);
	});

	it('moves a cursor with the keyboard and announces each point', async () => {
		const user = userEvent.setup();
		render(LineChart, props);
		await user.tab();
		expect(chart()).toHaveFocus();

		await user.keyboard('{ArrowLeft}');
		await expect.poll(() => status().textContent).toBe('Calliope 1, 10 min: 22 °C. Punkt 3 von 3.');

		await user.keyboard('{ArrowLeft}');
		await expect
			.poll(() => status().textContent)
			.toBe('Calliope 1, 5 min: 21,5 °C. Punkt 2 von 3.');

		// Down keeps the moment: the nearest point of the next series.
		await user.keyboard('{ArrowDown}');
		await expect
			.poll(() => status().textContent)
			.toBe('Wetterstation, 0 min: 17 °C. Punkt 1 von 2.');

		await user.keyboard('{End}');
		await expect
			.poll(() => status().textContent)
			.toBe('Wetterstation, 10 min: 18 °C. Punkt 2 von 2.');

		await user.keyboard('{Home}{ArrowUp}');
		await expect.poll(() => status().textContent).toBe('Calliope 1, 0 min: 20 °C. Punkt 1 von 3.');

		await user.keyboard('{Escape}');
		await expect.poll(() => status().textContent).toBe('');
	});

	it('stops at the ends of a series', async () => {
		const user = userEvent.setup();
		render(LineChart, props);
		chart().focus();
		await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
		await expect.poll(() => status().textContent).toBe('Calliope 1, 10 min: 22 °C. Punkt 3 von 3.');
	});

	it('says so when there are no values yet', () => {
		render(LineChart, { label: 'Temperatur', series: [] });
		expect(screen.queryByRole('application')).toBeNull();
		expect(screen.getByRole('img', { name: 'Temperatur: Noch keine Werte' })).toBeInTheDocument();
		expect(screen.queryByRole('table')).toBeNull();
	});

	it('shows a named spinner while loading', () => {
		const { container } = render(LineChart, { label: 'Temperatur', loading: true });
		const spinner = container.querySelector('.cui-spinner');
		expect(spinner).toHaveAttribute('role', 'status');
		expect(spinner).toHaveTextContent('Temperatur: Werte werden geladen');
		expect(container.querySelector('.cui-line-chart')).toHaveAttribute('aria-busy', 'true');
	});

	it('takes labels for another language', () => {
		render(LineChart, {
			...props,
			labels: { roleDescription: 'chart', table: (label: string) => `${label}: all values` }
		});
		expect(chart()).toHaveAttribute('aria-roledescription', 'chart');
		expect(screen.getByRole('table', { name: 'Temperatur: all values' })).toBeInTheDocument();
	});
});

describe('chart helpers', () => {
	it('keeps the slot of a known serial and gives new ones the next free slot', () => {
		const first = assignSeriesSlots(['B2', 'A1']);
		expect([...first]).toEqual([
			['B2', 1],
			['A1', 2]
		]);
		const later = assignSeriesSlots(['C3', 'A1'], new Map([['A1', 2]]));
		expect(later.get('A1')).toBe(2);
		expect(later.get('C3')).toBe(1);
	});

	it('gives each of the six slots its own shape', () => {
		const shapes = ([1, 2, 3, 4, 5, 6] as const).map(shapeOf);
		expect(new Set(shapes).size).toBe(6);
	});

	it('finds round value ticks that enclose the range', () => {
		expect(valueTicks(17.3, 24.1)).toEqual([16, 18, 20, 22, 24, 26]);
		expect(valueTicks(5, 5)).toEqual([4.5, 5, 5.5]);
	});

	it('puts time ticks on round steps', () => {
		const ticks = timeTicks(start + 2 * minute, start + 62 * minute, 4);
		expect(ticks.every((t) => (t - ticks[0]) % (15 * minute) === 0)).toBe(true);
		expect(ticks.length).toBeLessThanOrEqual(4);
	});

	it('takes the median spacing as the typical interval', () => {
		expect(typicalInterval([0, 10, 20, 30, 100])).toBe(10);
		expect(typicalInterval([5])).toBe(0);
	});
});
