'use client'
import { useContext, useEffect, useState } from 'react';
import styles from './Loader.module.css'
import Router from 'next/router';
import { usePathname } from 'next/navigation';
import { GlobalContext } from '@/context/globalContext';

const Loader = () =>{
    const pathname = usePathname()
    const { isLoading } = useContext(GlobalContext)

      
      return isLoading ? <span className={styles.loader}  />: null;

}

export default Loader