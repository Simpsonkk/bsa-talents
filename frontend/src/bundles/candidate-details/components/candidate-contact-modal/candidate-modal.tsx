import {
    Add as AddIcon,
    DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
import {
    Controller,
    type ControllerRenderProps,
    type SubmitHandler,
    useFieldArray,
} from 'react-hook-form';

import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Modal,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { ErrorMessage } from '~/bundles/common/components/error-message/error-message.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { actions as candidateActions } from '../../store/candidate.js';
import { type ContactCandidateDto } from '../../types/types.js';
import { contactCandidateValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { MessageTemplate } from '../components.js';
import {
    DEFAULT_CONTACT_CANDIDATE_MODAL,
    MODAL,
    TEXTAREA,
} from './constants.js';
import styles from './styles.module.scss';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const CandidateModal: React.FC<Properties> = ({ isOpen = true, onClose }) => {
    const [isSaveTemplateChecked, setIsSaveTemplateChecked] = useState(false);

    const dispatch = useAppDispatch();
    const { messageTemplates, candidateId, employerId } = useAppSelector(
        ({ candidate, searchCandidates, auth }) => ({
            messageTemplates: candidate.messageTemplates,
            candidateId: searchCandidates.currentCandidateDetails?.userId,
            employerId: auth.currentUser?.id,
        }),
    );

    const { control, errors, handleSubmit, setValue } =
        useAppForm<ContactCandidateDto>({
            defaultValues: DEFAULT_CONTACT_CANDIDATE_MODAL,
            validationSchema: contactCandidateValidationSchema,
        });

    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control,
    });

    const handleAddLink = useCallback((): void => {
        append({
            value: '',
        });
    }, [append]);

    const handleRemoveLink = useCallback(
        (index: number) => (): void => {
            remove(index);
        },
        [remove],
    );

    const handleApplyTemplate = useCallback(
        (message: string) => (): void => {
            setValue('message', message);
        },
        [setValue],
    );
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ContactCandidateDto> = useCallback(
        (data: ContactCandidateDto): void => {
            if (data.templateName) {
                const { templateName: name, message } = data;
                void dispatch(
                    candidateActions.addMessageTemplate({ name, message }),
                );
            }
            if (employerId && candidateId) {
                void dispatch(
                    chatActions.createMessage({
                        senderId: employerId,
                        receiverId: candidateId,
                        message:
                            data.message +
                            ' \n\n ' +
                            data.links
                                .map((item) => ` Vacancy_&_${item.value} `)
                                .join(' '),
                    }),
                );

                void dispatch(chatActions.getAllChatsByUserId(employerId));
                onClose();
                navigate(AppRoute.CHATS);
            }
        },
        [candidateId, dispatch, employerId, navigate, onClose],
    );

    const handleCheckboxOnChange = useCallback(
        (props: ControllerRenderProps<ContactCandidateDto, 'isSaveTemplate'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                props.onChange(event.target.checked);
                setIsSaveTemplateChecked(event.target.checked);
            },
        [],
    );

    const renderCheckbox = useCallback(
        ({
            field: props,
        }: {
            field: ControllerRenderProps<ContactCandidateDto, 'isSaveTemplate'>;
        }): React.ReactElement => {
            return (
                <Checkbox
                    name={props.name}
                    checked={props.value}
                    className={styles.checkbox}
                    onChange={handleCheckboxOnChange(props)}
                    label="Save as a template"
                />
            );
        },
        [handleCheckboxOnChange],
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const { control: templateControl, errors: templateErrors } = useAppForm({
        defaultValues: { templates: messageTemplates },
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            headerLabel="Contact candidate"
        >
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <Grid alignItems="start">
                    <Typography variant="h6">
                        Send the first message to the candidate
                    </Typography>
                    <FormControl
                        className={getValidClassNames(
                            styles.links,
                            styles.formControl,
                        )}
                    >
                        <FormLabel className={styles.label}>
                            <Typography variant="label">
                                Add link to the vacancy
                            </Typography>
                        </FormLabel>
                        {fields.map((field, index) => {
                            return (
                                <Grid key={index}>
                                    <Grid
                                        className={styles.linkWrapper}
                                        key={field.id}
                                    >
                                        <Input
                                            className={styles.link}
                                            control={control}
                                            errors={errors}
                                            name={`links.${index}.value`}
                                            placeholder="link"
                                            adornmentText="www."
                                        />
                                        <Button
                                            className={getValidClassNames(
                                                styles.button,
                                                styles.deleteButton,
                                            )}
                                            label=""
                                            onClick={handleRemoveLink(index)}
                                            variant="outlined"
                                            endIcon={
                                                <DeleteIcon
                                                    className={
                                                        styles.deleteIcon
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                        <Button
                            className={getValidClassNames(
                                styles.button,
                                styles.addLink,
                            )}
                            isDisabled={fields.length === MODAL.MAX_LINKS}
                            onClick={handleAddLink}
                            variant="text"
                            label="Add more links"
                            startIcon={<AddIcon />}
                            color="primary"
                        />
                        <ErrorMessage errors={errors} name={'links'} />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                        <FormLabel
                            className={getValidClassNames(
                                styles.label,
                                styles.messageLabel,
                            )}
                            required
                        >
                            <Typography variant="label">
                                Write a message
                            </Typography>
                        </FormLabel>
                        <Textarea
                            className={styles.message}
                            control={control}
                            errors={errors}
                            name="message"
                            placeholder="Text"
                            minRows={TEXTAREA.minRows}
                            maxRows={TEXTAREA.maxRows}
                        />
                        <ErrorMessage errors={errors} name={'message'} />

                        <Controller
                            name={'isSaveTemplate'}
                            control={control}
                            render={renderCheckbox}
                        />
                        {isSaveTemplateChecked && (
                            <Input
                                control={control}
                                errors={errors}
                                name={'templateName'}
                                placeholder="Template name"
                            />
                        )}
                    </FormControl>

                    {messageTemplates.length > MODAL.EMPTY_ARRAY_LENGTH && (
                        <Grid>
                            <Typography
                                variant="body1"
                                className={styles.templates}
                            >
                                Templates
                            </Typography>
                            {messageTemplates.map((template, index) => {
                                return (
                                    <MessageTemplate
                                        key={template.name}
                                        template={template}
                                        templates={messageTemplates}
                                        applyTemplate={handleApplyTemplate}
                                        control={templateControl}
                                        errors={templateErrors}
                                        name={`templates.${index}.name`}
                                    />
                                );
                            })}
                        </Grid>
                    )}
                    <Button
                        className={getValidClassNames(
                            styles.submit,
                            styles.button,
                        )}
                        type="submit"
                        label="Sent message"
                    />
                </Grid>
            </form>
        </Modal>
    );
};

export { CandidateModal };
