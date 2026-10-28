import { addons } from 'storybook/manager-api';
import { STORY_CHANGED, STORY_RENDERED } from 'storybook/internal/core-events';

// Foundations pages are documentation without args: hide the addon panel there so the
// page gets the full height, and bring it back for component stories.
addons.register('calliope/foundations-layout', (api) => {
	const update = () => {
		const story = api.getCurrentStoryData();
		if (story) api.togglePanel(!story.title.startsWith('Foundations/'));
	};
	api.on(STORY_CHANGED, update);
	api.on(STORY_RENDERED, update);
	update();
});
