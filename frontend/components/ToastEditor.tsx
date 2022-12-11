import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { forwardRef, MutableRefObject } from 'react';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: MutableRefObject<Editor>;
}

const ToastEditor = ({ placeholder, ...props }: TuiEditorWithForwardedProps) => (
  <Editor
    {...props}
    placeholder={placeholder}
    initialValue="글 내용을 입력해 주세요"
    height="650px"
    previewStyle="vertical"
    initialEditType="wysiwyg"
    useCommandShortcut
  />
);

const ToastEditorForwardRef = forwardRef(ToastEditor);

export default ToastEditorForwardRef;
