import React, {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DataProps } from '../App';
import { ReactComponent as Book } from '../assets/book.svg';
import { ReactComponent as Close } from '../assets/cancel.svg';
import styles from '../style/Modal.module.css';

export interface ModalProps {
  data: DataProps;
}

export interface ModalHandles {
  openModal: () => void;
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { data },
  ref,
) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (textAreaRef.current?.value) {
        setComment([...comment, textAreaRef.current?.value]);
      }
    },
    [comment],
  );

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Book className={styles.book} />
        <div className={styles.content}>
          <h1>{data.title}</h1>
          <span>{`Author: ${data.author}`}</span>
          <span>{`Year: ${data.year}`}</span>
          <Close onClick={closeModal} className={styles.close} />
        </div>

        <h2>Comments</h2>
        {comment && (
          <ul>
            {comment.map(text => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <textarea ref={textAreaRef} name="comment" rows={5} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default forwardRef(Modal);
