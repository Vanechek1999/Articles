import { useState, useCallback } from 'react'

type useArticleShowModalInterface = {
  isModalOpen: boolean,
  handleModalOpen: () => void
  handleModalClose: () => void
}


const useArticleShowModal = (): useArticleShowModalInterface => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = useCallback(() => setIsModalOpen(true), [])
  const handleModalClose = useCallback(() => setIsModalOpen(false), [])

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  }
}

export default useArticleShowModal