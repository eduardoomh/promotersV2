'use client'
import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import styles from './Loader.module.css'
import Router from 'next/router';
import { usePathname } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

const Loader: FC = () => {
  const pathname = usePathname()
  const { isLoading } = useContext(GlobalContext)


  return isLoading ?
    <div className={styles.container}>
      <span className={styles.loader} />
    </div>
    : null;

}

export default Loader