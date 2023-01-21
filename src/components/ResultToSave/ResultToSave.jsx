import React, { useCallback, useMemo, useState } from "react";
import ExportToXLSX from "../../utils/ExportToXLSX";
import ComparisonResult from "../ComparisonResult/ComparisonResult";
import styles from "./ResultToSave.module.css";

const ResultToSave = ({ result, store }) => {
  const { product, comparison } = result;

  const [comparisonResults, setComparisonResults] = useState(() => comparison?.map((el) => ({ ...el, isChecked: false })));

  const { title, thumbnail, link, product_page_url } = product;
  const productPrice = useMemo(() => product.primary_offer?.offer_price || product.primary_offer?.min_price || product.price?.extracted, [product]);
  const shippingPrice = useMemo(
    () => (!product?.shipping || product.shipping === "Free shipping" ? 0 : parseFloat(product.shipping.slice(2))),
    [product]
  );

  const totalPrice = useMemo(() => productPrice + shippingPrice, [productPrice, shippingPrice]);

  const getProductPrices = useCallback(
    (el) => {
      const price = el.primary_offer?.offer_price || el.primary_offer?.min_price || el.price?.extracted;
      const shipping = !el.shipping || el.shipping === "Free shipping" ? 0 : parseFloat(el.shipping.extracted || el.shipping.slice(2));
      const total = (price + shipping).toFixed(2);
      const profit = (totalPrice - total).toFixed(2);
      return { total, profit };
    },
    [totalPrice]
  );

  const dataToSave = useMemo(() => {
    const selectedComparison =
      comparisonResults
        ?.filter((el) => el.isChecked)
        ?.map((el) => {
          const { total, profit } = getProductPrices(el);
          return {
            product_to_sell: el.title,
            product_to_sell_total_price: total,
            product_to_sell_profit: profit,
            product_to_sell_link: el.product_page_url || el.link,
          };
        }) || [];
    return [
      { target_product: product.title, target_product_total_price: totalPrice, target_product_link: product.product_page_url || product.link },
      ...selectedComparison,
    ];
  }, [comparisonResults, product, getProductPrices, totalPrice]);

  const canSave = useMemo(() => comparisonResults?.some((el) => el.isChecked), [comparisonResults]);

  const checkAction = useCallback(
    (i) => {
      const newResults = comparisonResults?.map((el, index) => ({ ...el, isChecked: index === i ? !el.isChecked : el.isChecked }));
      setComparisonResults(newResults);
    },
    [comparisonResults]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <div className={styles.product__left_side}>
          <div className={styles.product__image}>
            <img src={thumbnail} alt={title} />
          </div>
          <div className={styles.product__title} title={title}>
            <a href={link || product_page_url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </div>
        </div>
        <div className={styles.product__right_side}>
          <div className={styles.product__price}>Price: ${productPrice}</div>
          {store === "ebay" && shippingPrice ? (
            <>
              <div className={styles.product__price}>Shipping: ${shippingPrice.toFixed(2)}</div>
              <div className={styles.product__price}>Total: ${totalPrice.toFixed(2)}</div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.comparison}>
        {comparisonResults?.length ? (
          comparisonResults?.map((el, i) => {
            const { isChecked, title, thumbnail, link, product_page_url } = el;
            const { total, profit } = getProductPrices(el);
            return (
              <ComparisonResult
                key={i}
                title={title}
                price={total}
                profit={profit}
                thumbnail={thumbnail}
                isChecked={isChecked}
                checkAction={() => checkAction(i)}
                link={link || product_page_url}
              />
            );
          })
        ) : (
          <div className={styles.error}>
            <span>No matches found for this product. Try lowering the matching accuracy or select a different product.</span>
          </div>
        )}
      </div>
      <div className={styles.export_button}>
        <ExportToXLSX data={dataToSave} fileName={product.title.slice(0, 15)} disabled={!canSave} />
      </div>
    </div>
  );
};

export default ResultToSave;
