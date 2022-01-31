const Layout = ({ title, children }) => {
  return <div className={`page-template-${title}`}>{children}</div>
}

export default Layout
