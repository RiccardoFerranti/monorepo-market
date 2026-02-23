import { render } from "@testing-library/react";
import { SkeletonBlock, SkeletonCard } from "./skeleton-card";

describe("Skeleton", () => {
  it("should render SkeletonBlock with base classes", () => {
    const { container } = render(<SkeletonBlock />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rounded-md");
    expect(el.className).toContain("overflow-hidden");
  });

  it("should merge SkeletonBlock className", () => {
    const { container } = render(<SkeletonBlock className="h-10 w-10" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("w-10");
  });

  it("should render SkeletonCard and children", () => {
    const { getByText } = render(
      <SkeletonCard>
        <div>Inside</div>
      </SkeletonCard>,
    );
    expect(getByText("Inside")).toBeInTheDocument();
  });

  it("should merge SkeletonCard className", () => {
    const { container } = render(
      <SkeletonCard className="my-skel-card">
        <div />
      </SkeletonCard>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-skel-card");
    expect(el.className).toContain("rounded-2xl");
  });
});
