import * as React from "react";
import styles from "../styles/Home.module.css";

const useHydrated = () => {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true)
  }, []);

  return hydrated;
}

export async function getStaticProps() {
  return {
    props: {
      message: "This is a static page — and a prop",
    },
  };
}

export default function Marketing({message, promotion}) {
  const hydrated = useHydrated();
  return (
    <div className={styles.container}>
      <h1>Landing Page</h1>
      <p id="message">{message}</p>
      <div>
        {hydrated && promotion ? (
          <div className={styles.wrap}>
            { promotion.map((promo) => (
              <div key={promo.ref.id} className={styles.item}>
                <h2>{promo.data.title}</h2>
                <img className={styles.img} src={promo.data.img} />
              </div>
            ))}
          </div>
        ) : <p>No promo for me</p>}
      </div>
    </div>
  );
}