import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen?: boolean;
	form: {
		state: ArticleStateType;
		onChange: (nextState: ArticleStateType) => void;
		onApply: () => void;
		onReset: () => void;
	};
};

export const ArticleParamsForm = ({
	isOpen: isOpenProp,
	form,
}: ArticleParamsFormProps) => {
	const [isOpenState, setIsOpenState] = useState(false);
	const formRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const isOpen = isOpenProp ?? isOpenState;
	const isControlled = isOpenProp !== undefined;
	const { state: formState, onChange, onApply, onReset } = form;

	useEffect(() => {
		if (!isOpen || isControlled) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (formRef.current?.contains(target)) {
				return;
			}
			if (buttonRef.current?.contains(target)) {
				return;
			}
			setIsOpenState(false);
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, isControlled]);

	const handleToggleOpen = () => {
		if (isControlled) {
			return;
		}
		setIsOpenState((prevState) => !prevState);
	};

	const handleOptionChange = (field: keyof ArticleStateType) => {
		return (option: OptionType) => {
			onChange({
				...formState,
				[field]: option,
			});
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onReset();
	};

	return (
		<>
			<div ref={buttonRef}>
				<ArrowButton isOpen={isOpen} onClick={handleToggleOpen} />
			</div>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.fields}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleOptionChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='Размер шрифта'
							onChange={handleOptionChange('fontSizeOption')}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleOptionChange('fontColor')}
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleOptionChange('backgroundColor')}
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleOptionChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
