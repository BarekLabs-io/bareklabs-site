import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import Insights from './pages/Insights'
import Ideas from './pages/Ideas'
import AiValueChain from './pages/AiValueChain'
import SpaceEconomy from './pages/SpaceEconomy'
import GlobalPayments from './pages/GlobalPayments'
import Oracle from './pages/Oracle'
import Crypto2026 from './pages/Crypto2026'
import SoukSignal from './pages/SoukSignal'
import TradeTracker from './pages/TradeTracker'
import Stocks from './pages/Stocks'
import Crypto from './pages/Crypto'
import About from './pages/About'
import DataAudit from './pages/DataAudit'

// Company deep dives (and the screener, which reads the same dataset) carry
// a growing per-ticker dataset — code-split so it only loads when one of
// these routes is actually visited, not on every page load.
const CompanyPage = lazy(() => import('./pages/Company'))
const Screener = lazy(() => import('./pages/Screener'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/insights" element={<Insights />} />
        <Route path="/analysis/ideas" element={<Ideas />} />
        <Route path="/analysis/ai-value-chain" element={<AiValueChain />} />
        <Route path="/analysis/space-economy" element={<SpaceEconomy />} />
        <Route path="/analysis/global-payments" element={<GlobalPayments />} />
        <Route path="/analysis/oracle" element={<Oracle />} />
        <Route path="/analysis/crypto-2026" element={<Crypto2026 />} />
        <Route path="/souk-signal" element={<SoukSignal />} />
        <Route path="/trade-tracker" element={<TradeTracker />} />
        <Route path="/trade-tracker/stocks" element={<Stocks />} />
        <Route path="/trade-tracker/crypto" element={<Crypto />} />
        <Route
          path="/trade-tracker/screener"
          element={
            <Suspense fallback={null}>
              <Screener />
            </Suspense>
          }
        />
        <Route path="/about" element={<About />} />
        {/* Maintenance view — deliberately not in the nav. */}
        <Route path="/data-audit" element={<DataAudit />} />
        <Route
          path="/companies/:ticker"
          element={
            <Suspense fallback={null}>
              <CompanyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
