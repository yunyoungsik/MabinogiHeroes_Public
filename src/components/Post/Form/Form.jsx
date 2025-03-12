import LinkLineButton from '@/components/ui/Button/LinkLineButton';
import LineButton from '@/components/ui/Button/LineButton';
import styles from './Form.module.scss';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post__title">
          <span className={styles.srOnly}>제목</span>
          <input
            id="post__title"
            name="post__title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="제목"
            required
          />
        </label>

        <label htmlFor="post__desc">
          <span className={styles.srOnly}>글을 작성해주세요.</span>
          <textarea
            id="post__desc"
            name="post__desc"
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            placeholder="내용"
            required
          />
        </label>

        <div className={styles.button}>
          <div className={styles.buttonGroup}>
            <LinkLineButton href="/notice" padding="var(--space-2) var(--space-4)">
              취소
            </LinkLineButton>

            <LineButton
              buttonType="submit"
              disabled={submitting}
              padding="var(--space-2) var(--space-4)"
            >
              {submitting ? `${type}중` : type}
            </LineButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
