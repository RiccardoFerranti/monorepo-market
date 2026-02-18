type Props = {
  params: Promise<{ market: string }>;
};

export default async function MarketPage({ params }: Props) {
  const { market } = await params;
  return <div>Market: {market}</div>;
}
