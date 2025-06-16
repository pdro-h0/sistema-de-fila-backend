/**@swagger
 * /queue:
 *   post:
 *     summary: Registra um novo cliente na fila
 *     tags:
 *       - Queue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - priority
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Normal, High, Urgent]
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 position:
 *                   type: number
 *         description: Cliente registrado na fila com sucesso 

*@swagger
 * /queue/{id}/position:
 *   get:
 *     summary: Retorna a posição do cliente na fila
 *     tags:
 *       - Queue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 position:
 *                   type: number
 *                 estimedTime:
 *                   type: string
 *         description: Posição do cliente na fila 
 * 
*@swagger
 * /queue/{id}:
 *   delete:
 *     summary: Cancela o serviço do cliente
 *     tags:
 *       - Queue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Serviço cancelado com sucesso
 * 
*@swagger
 * /queue:
 *   get:
 *     summary: Retorna todos os clientes na fila
 *     tags: 
 *       - Queue
 *     parameters:
 *       - in: query
 *         name: queueCategory
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: number
 *                   prioriry:
 *                     type: string
 *                     enum: [Normal, High, Urgent]
 *         description: Lista de clientes na fila
 * 
*@swagger
 * /queue/next:
 *   post:
 *     summary: Chama próximo cliente na fila
 *     tags:
 *       - Queue
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 called:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 position:
 *                   type: number
 *                 queueCategory:
 *                   type: string
 *         description: Próximo cliente na fila
 * 
*@swagger
 * /admin/metrics:
 *   get:
 *     summary: Retorna as métricas da fila
 *     tags:
 *       - Queue
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avarageWaitTime:
 *                   type: string
 *                 totalClientsCalled:
 *                   type: number
 *                 totalClientsCanceled:
 *                   type: number
 *                 categories:
 *                  type: object
 *         description: Métricas da fila
 * */
