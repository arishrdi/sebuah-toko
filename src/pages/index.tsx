import { type NextPage } from "next";
import Head from "next/head";
import CardProducts from "~/components/CardProducts";
import CartItems from "~/components/CartItems";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-5">
        <div className="flex gap-5">
          <CardProducts />
          <CartItems />
        </div>
      </main>
    </>
  );
};

export default Home;