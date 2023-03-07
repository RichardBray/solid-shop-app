interface HomePageProps {
  totalItems: number;
}

export default function HomePage({totalItems}: HomePageProps) {
  return <h2>You are viewing {totalItems} Products</h2>;
}
