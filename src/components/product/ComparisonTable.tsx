import { StarRating } from "@/components/ui/StarRating";
import { BuyButton } from "@/components/affiliate/AffiliateLink";
import { ProductThumb } from "@/components/product/ProductThumb";
import { type ListProduct, productHref, productRetailer } from "@/lib/products";

interface ComparisonTableProps {
  products: ListProduct[];
  title?: string;
  subtitle?: string;
  /** "Prices last verified …" line shown under the table. */
  verifiedNote?: string;
}

export function ComparisonTable({
  products,
  title = "At-a-glance comparison",
  subtitle,
  verifiedNote,
}: ComparisonTableProps) {
  if (!products || products.length === 0) return null;
  const sorted = [...products].sort((a, b) => a.rank - b.rank);

  return (
    <>
      <div className="tblwrap not-prose" id="compare">
        <div className="tbl-head">
          <b>{title}</b>
          <span>{subtitle ?? `${sorted.length} top picks · scored /5`}</span>
        </div>
        <div className="tbl-scroll">
          <table className="cmp">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th className="hide-sm">Best for</th>
                <th>Rating</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.rank} className={p.rank === 1 ? "top" : undefined}>
                  <td>
                    <span className={`rk${p.rank === 1 ? " one" : ""}`}>
                      {p.rank}
                    </span>
                  </td>
                  <td>
                    <div className="prod-cell">
                      <span className="pthumb">
                        <ProductThumb image={p.image} name={p.name} />
                      </span>
                      <div>
                        <b>{p.name}</b>
                        <small>{p.oneLiner}</small>
                        {p.badge && (
                          <>
                            <br />
                            <span
                              className={`badge-best${p.rank === 1 ? "" : " alt"}`}
                            >
                              {p.badge}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hide-sm">{p.bestFor ?? "—"}</td>
                  <td>
                    <div className="rating-cell">
                      <StarRating rating={p.rating} />
                      <b>{p.rating.toFixed(1)}</b>
                    </div>
                  </td>
                  <td>
                    <span className="price">
                      {p.price}
                      {p.pricePerServing && <small>{p.pricePerServing}</small>}
                    </span>
                  </td>
                  <td>
                    <BuyButton
                      href={productHref(p)}
                      retailer={productRetailer(p)}
                      productName={p.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {verifiedNote && (
        <p
          className="not-prose"
          style={{
            fontSize: 13,
            color: "var(--muted)",
            margin: "0 0 8px",
          }}
        >
          {verifiedNote}
        </p>
      )}
    </>
  );
}
