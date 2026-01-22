import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = () => {
		setPageState(formState);
	};

	const handleReset = () => {
		setPageState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				form={{
					state: formState,
					onChange: setFormState,
					onApply: handleApply,
					onReset: handleReset,
				}}
			/>
			<Article />
		</main>
	);
};

export default App;
