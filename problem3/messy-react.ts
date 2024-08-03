//move WalletBallance and FormattedWalletBalance to a 'definitions.ts' to remove clutter
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}

//With React 18, use React.FC is unnecessary because of the implicit children prop, which isn't even utilized in the WalletPage component.
//Furthermore, the passed props are not being destructured, which is not best practice and becomes extra work for other devs to figure out what the props exactly are.
//though without knowing what exactly is in the type Props, I can only mention this issue at this time, and cannot provide a refactor.
//const WalletPage: React.FC<Props> = (props: Props) => {
export default function WalletPage(props: Props)
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  //this function is self-contained, so it should be moved to another file named `utils.ts` to avoid clutter
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  //memo function is excessively cryptic and is performing both a filtering and sorting task. Furthermore it is without comments.
  //
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  // const balancePriority = getPriority(balance.blockchain); //this isn't being used
      // should combine these two statements
		  // if (lhsPriority > -99) {
		  //    if (balance.amount <= 0) {
		  //      return true;
		  //    }
		  // }
      if (lhsPriority > -99 && balance.amount <= 0) {
        return true;
      }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
      //since priority is a number and an equals case implies two operands are of the same blockchain,
      //we can reduce this if-else statement, which makes for less code.
		  // if (leftPriority > rightPriority) {
		  //   return -1;
		  // } else if (rightPriority > leftPriority) {
		  //   return 1;
		  // }
      if (leftPriority > rightPriority) {
        return -1;
      }
      return 1;
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}